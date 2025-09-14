from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestAnalyzeSignalAPI:
    """Integration tests for the API endpoints"""

    def test_analisar_sinal_success(self):
        response = client.post(
            "/analyze_signal/analisar_sinal", json={"data": [1, 2, 3, 4, 5]}
        )

        assert response.status_code == 200
        data = response.json()
        assert data["average"] == 3.0
        assert data["minimum"] == 1
        assert data["maximum"] == 5
        assert data["trend"] == "ascending"

    def test_analisar_sinal_descending(self):
        response = client.post(
            "/analyze_signal/analisar_sinal", json={"data": [5, 4, 3, 2, 1]}
        )

        assert response.status_code == 200
        data = response.json()
        assert data["average"] == 3.0
        assert data["minimum"] == 1
        assert data["maximum"] == 5
        assert data["trend"] == "descending"

    def test_analisar_sinal_stable(self):
        response = client.post(
            "/analyze_signal/analisar_sinal", json={"data": [3, 3, 3, 3, 3]}
        )

        assert response.status_code == 200
        data = response.json()
        assert data["average"] == 3.0
        assert data["minimum"] == 3
        assert data["maximum"] == 3
        assert data["trend"] == "stable"

    def test_analisar_sinal_empty_array(self):
        response = client.post(
            "/analyze_signal/analisar_sinal", json={"data": []}
        )

        assert response.status_code == 422  # Validation error

    def test_analisar_sinal_invalid_data_type(self):
        response = client.post(
            "/analyze_signal/analisar_sinal", json={"data": ["a", "b", "c"]}
        )

        assert response.status_code == 422  # Validation error

    def test_analisar_sinal_missing_data_field(self):
        response = client.post("/analyze_signal/analisar_sinal", json={})

        assert response.status_code == 422  # Validation error

    def test_health_endpoint(self):
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy"}

    def test_root_endpoint(self):
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "endpoints" in data
        assert data["message"] == "Signal Analysis API"
