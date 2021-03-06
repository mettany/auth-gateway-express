cd auth-gateway-express
docker build -t mettan-dev/auth-gateway-express:latest .
cd ..

cd spa-example
npm run build
docker build -t mettan-dev/spa-example:latest .