cd auth-gateway-express
docker build -t mettan-dev/auth-gateway-express:latest .
cd ..

cd api-example
docker build -t mettan-dev/api-example:latest .
cd ..

cd spa-example
npm run build
docker build -t mettan-dev/spa-example:latest .