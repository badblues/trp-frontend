all:run 

run:
	docker compose up -d

build:
	docker compose up --build -d
 
clean:
	rm -rf build/*
	docker compose down --volumes --remove-orphans

down:
	docker compose down  