

rundb:
	docker compose -f docker-compose.yml up mysql -d


run:
	docker compose -f docker-compose.yml build
	docker compose -f docker-compose.yml up -d

restart: 
	docker compose -f docker-compose.yml down -v
	docker compose -f docker-compose.yml up -d


upload: 
	tar --exclude='myapp/node_modules' -czvf app.tar *
	scp app.tar iot:/root/app.tar
	rm app.tar

dev: 
	cd myapp && npm run start