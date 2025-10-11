#!/usr/bin/env python3
import http.server
import socketserver
import os
import mimetypes
from urllib.parse import urlparse

class DevHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def guess_type(self, path):
        # Override MIME types for development
        mimetype, encoding = mimetypes.guess_type(path)
        if path.endswith('.tsx') or path.endswith('.ts'):
            return 'application/javascript'
        elif path.endswith('.jsx'):
            return 'application/javascript'
        elif path.endswith('.mjs'):
            return 'application/javascript'
        return mimetype

    def do_GET(self):
        # Handle root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Handle Vite dev server paths
        if self.path.startswith('/src/'):
            # Serve source files directly
            pass
        elif self.path == '/src/main.tsx':
            # Handle main entry point
            pass
            
        return super().do_GET()

PORT = 3000

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), DevHTTPRequestHandler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

