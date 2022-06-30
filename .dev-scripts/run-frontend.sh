if command -v gp >/dev/null; then
    export DJANGO_VITE_DEV_SERVER_CLIENT_PORT=443
    export DJANGO_VITE_DEV_SERVER_HOST="$(gp url 3000 | sed s#https://##gi)"
fi
yarn dev
