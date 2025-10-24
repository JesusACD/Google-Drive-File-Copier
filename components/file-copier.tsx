"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CheckCircle, AlertCircle, Loader2, ExternalLink, Info } from "lucide-react";

interface CopiedFile {
  id: string;
  name: string;
  webViewLink: string;
}

export function FileCopier() {
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<CopiedFile | null>(null);

  const handleCopyFile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/copy-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al copiar el archivo");
      }

      setSuccess(data.file);
      setFileUrl("");
    } catch (err: any) {
      setError(err.message || "Error al copiar el archivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Copy className="h-6 w-6" />
          Copiar Archivo de Google Drive
        </CardTitle>
        <CardDescription>
          Ingresa la URL del archivo de Google Drive que deseas copiar a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-900 dark:text-blue-100">
            <strong>Importante:</strong> Solo puedes copiar archivos a los que tengas acceso con la cuenta mostrada arriba. 
            Si el archivo no es tuyo, asegúrate de que esté compartido contigo o sea público.
          </p>
        </div>

        <form onSubmit={handleCopyFile} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="https://drive.google.com/file/d/..."
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              disabled={loading}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Puedes pegar la URL completa del archivo o solo el ID del archivo
            </p>
          </div>

          <Button type="submit" disabled={loading || !fileUrl} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Copiando archivo...
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copiar Archivo
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">Error</p>
              <p className="text-sm text-destructive/90 whitespace-pre-line">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                  ¡Archivo copiado exitosamente!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  {success.name}
                </p>
                {success.webViewLink && (
                  <a
                    href={success.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:underline mt-2"
                  >
                    Ver archivo en Drive
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-muted/50 rounded-md">
          <h4 className="text-sm font-medium mb-2">Formatos de URL soportados:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• https://drive.google.com/file/d/FILE_ID/view</li>
            <li>• https://drive.google.com/open?id=FILE_ID</li>
            <li>• Solo el FILE_ID</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
