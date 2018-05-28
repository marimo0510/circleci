import requests

def test_nginx():
    r = requests.get('http://localhost:8080')
    assert r.status_code == 200
