FROM python:3.11-alpine

WORKDIR /server

COPY requirements.txt /server
RUN pip install -r requirements.txt

ENTRYPOINT [ "flask", "--app", "server", "run", "--host=0.0.0.0", "--port=7801"]

