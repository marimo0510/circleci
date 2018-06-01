FROM python:3.5

RUN groupadd -r uwsgi && useradd -r -g uwsgi uwsgi

COPY ./requirements.txt /requirements.txt

RUN pip install -r /requirements.txt

COPY . /app

RUN chown -R uwsgi /app

COPY uwsgi.sh /uwsgi.sh

RUN chmod +x /uwsgi.sh

#EXPOSE 5000
#COPY ./static /static
#COPY ./media /media

#CMD ["/uwsgi.sh"]
