import requests

def test_nginx():
    r = requests.get("http://web:80/polls/")
    assert r.status_code == 200
