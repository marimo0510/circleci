FROM alpine:3.5

RUN apk update \
    && apk add --no-cache python \
    \
    && python -m ensurepip \
    && rm -r /usr/lib/python*/ensurepip \
    && pip install --upgrade pip setuptools \
    && rm -r /root/.cache

# pytest
RUN pip install pytest requests pings\
&& rm -r /root/.cache

RUN mkdir /test

ENV PYTHONDONTWRITEBYTECODE "don't create *.pyc and __pycache__"
ENTRYPOINT ["pytest", "/test"]
