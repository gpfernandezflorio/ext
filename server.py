import argparse, os
from http.server import HTTPServer, BaseHTTPRequestHandler

class S(BaseHTTPRequestHandler):
    def _set_response(self, n, headers):
        self.send_response(n)
        self.send_header('Cache-Control', 'no-cache')
        for h in headers:
            self.send_header(h, headers.get(h))
        self.end_headers()

    def do_GET(self):
        ruta = self.path[1:]
        if (ruta == ''):
            self._set_response(302, {'Location': ruta + 'index.html'})
        elif (os.path.isfile(ruta)):
            f = open(ruta, 'rb')
            self._set_response(200, {'Content-type':tipo_archivo(ruta)})
            self.wfile.write(f.read())
            f.close()
        else:
            print("Archivo {} no econtrado".format(self.path))

def tipo_archivo(filename):
    if filename[-4:] == '.css':
        return 'text/css'
    if filename[-5:] == '.json':
        return 'application/json'
    if filename[-3:] == '.js':
        return 'application/javascript'
    if filename[-4:] == '.ico':
        return 'image/x-icon'
    if filename[-4:] == '.svg':
        return 'image/svg+xml'
    return 'text/html'

if __name__ == "__main__":
    httpd = HTTPServer(('localhost', 8000), S)
    httpd.serve_forever()
