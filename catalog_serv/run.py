import uvicorn

if __name__ == "__main__":
    print("Avvio dell'applicazione catalog_serv")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)