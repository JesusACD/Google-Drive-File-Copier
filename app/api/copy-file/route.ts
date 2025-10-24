import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return NextResponse.json(
        { error: "URL del archivo es requerida" },
        { status: 400 }
      );
    }

    // Extraer el ID del archivo de la URL
    const fileId = extractFileId(fileUrl);

    console.log("URL recibida:", fileUrl);
    console.log("ID extraído:", fileId);

    if (!fileId) {
      return NextResponse.json(
        { error: "URL inválida. Por favor, proporciona una URL válida de Google Drive" },
        { status: 400 }
      );
    }

    // Configurar el cliente de Google Drive
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: session.accessToken,
    });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // Verificar que el archivo existe y tenemos acceso
    let fileMetadata;
    try {
      fileMetadata = await drive.files.get({
        fileId: fileId,
        fields: "id, name, mimeType",
      });
    } catch (error: any) {
      console.error("Error al acceder al archivo:", error);
      
      if (error.code === 404) {
        return NextResponse.json(
          { 
            error: `Archivo no encontrado (ID: ${fileId}).\n\nVerifica que:\n• El archivo existe en Google Drive\n• Tienes permisos para acceder a él\n• Estás autenticado con la cuenta correcta (${session.user?.email})\n• El archivo está compartido contigo o es público\n\nPrueba creando un archivo propio en tu Drive y copiando ese enlace.` 
          },
          { status: 404 }
        );
      }
      if (error.code === 403) {
        return NextResponse.json(
          { error: `No tienes permisos para acceder a este archivo.\n\nCuenta actual: ${session.user?.email}\n\nAsegúrate de que el archivo esté compartido con esta cuenta o sea público.` },
          { status: 403 }
        );
      }
      throw error;
    }

    // Copiar el archivo
    const copiedFile = await drive.files.copy({
      fileId: fileId,
      requestBody: {
        name: `Copia de ${fileMetadata.data.name}`,
      },
      fields: "id, name, webViewLink",
    });

    return NextResponse.json({
      success: true,
      file: {
        id: copiedFile.data.id,
        name: copiedFile.data.name,
        webViewLink: copiedFile.data.webViewLink,
      },
      message: "Archivo copiado exitosamente",
    });
  } catch (error: any) {
    console.error("Error al copiar archivo:", error);

    if (error.code === 403) {
      return NextResponse.json(
        { error: "No tienes permisos para copiar este archivo" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Error al copiar el archivo" },
      { status: 500 }
    );
  }
}

function extractFileId(url: string): string | null {
  // Limpiar la URL de espacios y saltos de línea
  const cleanUrl = url.trim();
  
  // Patrones comunes de URLs de Google Drive
  const patterns = [
    // https://drive.google.com/file/d/FILE_ID/view
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    // https://drive.google.com/open?id=FILE_ID
    /[?&]id=([a-zA-Z0-9_-]+)/,
    // https://docs.google.com/document/d/FILE_ID/edit
    /\/document\/d\/([a-zA-Z0-9_-]+)/,
    // https://docs.google.com/spreadsheets/d/FILE_ID/edit
    /\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,
    // https://docs.google.com/presentation/d/FILE_ID/edit
    /\/presentation\/d\/([a-zA-Z0-9_-]+)/,
    // Solo el ID
    /^([a-zA-Z0-9_-]{25,})$/,
  ];

  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
