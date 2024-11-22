import sqlite3
import json
import pandas as pd
from typing import List, Dict, Any
import sqlalchemy as sa
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class ContainerResource(Base):
    """
    Modello ORM per risorse container
    """
    __tablename__ = 'container_resources'

    id = Column(String, primary_key=True)
    resource_name = Column(String)
    resource_category = Column(String)
    currency_code = Column(String)
    unit_of_measure = Column(String)
    unit_price = Column(Float)
    product_name = Column(String)
    
    # Campi flavor
    flavor_id = Column(String)
    flavor_name = Column(String)
    os_platform = Column(String)
    cpu = Column(String)
    ram = Column(String)
    disk = Column(String)

class KaaSContainerManager:
    def __init__(self, db_path: str = 'kaas_containers.db'):
        """
        Inizializza il gestore dei container con connessione al database
        """
        # Crea connessione SQLAlchemy
        self.engine = create_engine(f'sqlite:///{db_path}')
        Base.metadata.create_all(self.engine)
        
        # Crea sessione
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

    def load_catalog_from_json(self, json_path: str = 'catalog_container.json'):
        """
        Carica il catalogo dei container da file JSON nel database
        """
        # Legge il file JSON
        with open(json_path, 'r') as file:
            catalog = json.load(file)
        
        # Pulisce il database esistente
        self.session.query(ContainerResource).delete()
        
        # Inserisce nuove risorse
        for item in catalog:
            container = ContainerResource(
                id=item['_id'],
                resource_name=item['resourceName'],
                resource_category=item['resourceCategory'],
                currency_code=item['currencyCode'],
                unit_of_measure=item['unitOfMeasure'],
                unit_price=item['unitPrice'],
                product_name=item['productName'],
                
                # Gestione flavor
                flavor_id=item.get('flavor', {}).get('id'),
                flavor_name=item.get('flavor', {}).get('name'),
                os_platform=item.get('flavor', {}).get('osPlatform'),
                cpu=item.get('flavor', {}).get('cpu'),
                ram=item.get('flavor', {}).get('ram'),
                disk=item.get('flavor', {}).get('disk')
            )
            self.session.add(container)
        
        # Commit delle modifiche
        self.session.commit()
        print(f"Caricati {len(catalog)} container nel database.")

    def calculate_best_container(self, cpu_needed: int, ram_needed: int):
        """
        Calcola il miglior container basato su CPU e RAM
        """
        # Query per trovare container compatibili
        query = self.session.query(ContainerResource).filter(
            sa.cast(ContainerResource.cpu, sa.Integer) >= cpu_needed,
            sa.cast(ContainerResource.ram, sa.Integer) >= ram_needed
        ).order_by(
            sa.cast(ContainerResource.cpu, sa.Integer),
            sa.cast(ContainerResource.ram, sa.Integer)
        ).limit(5)
        
        # Converte risultati in DataFrame per analisi
        results = pd.read_sql(query.statement, self.session.bind)
        
        # Calcola punteggio di compatibilità
        results['compatibility_score'] = (
            results['cpu'].astype(int) / cpu_needed +
            results['ram'].astype(int) / ram_needed
        )
        
        # Ordina per punteggio di compatibilità
        best_containers = results.sort_values('compatibility_score')
        
        return best_containers[['flavor_name', 'cpu', 'ram', 'unit_price', 'compatibility_score']]

    def get_reservation_prices(self, container_id: str):
        """
        Recupera i prezzi per le diverse durate di prenotazione
        """
        # Carica il container specifico
        container = self.session.query(ContainerResource).filter_by(id=container_id).first()
        
        # Legge il file JSON originale per recuperare le prenotazioni
        with open('catalog_container.json', 'r') as file:
            catalog = json.load(file)
        
        # Trova le prenotazioni per questo container
        for item in catalog:
            if item['_id'] == container_id:
                return item.get('reservations', [])
        
        return []

# Esempio di utilizzo
if __name__ == '__main__':
    manager = KaaSContainerManager()
    
    # Carica il catalogo nel database
    manager.load_catalog_from_json()
    
    # Esempio: trova migliori container per 8 CPU e 16 RAM
    best_containers = manager.calculate_best_container(8, 16)
    print("\nMiglori Container Compatibili:")
    print(best_containers)
    
    # Esempio: prezzi prenotazione per un container specifico
    reservations = manager.get_reservation_prices('66079ef91da04a91bffeb104545d3464')
    print("\nOpzioni Prenotazione:")
    for reservation in reservations:
        print(f"Durata: {reservation['term']}, Prezzo: {reservation['price']} EUR")
