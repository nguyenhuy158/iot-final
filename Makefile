

rundb:
	docker compose -f docker-compose.yml up mysql -d


run:
	docker compose -f docker-compose.yml build
	docker compose -f docker-compose.yml up -d

restart: 
	docker compose -f docker-compose.yml down -v
	docker compose -f docker-compose.yml up -d
