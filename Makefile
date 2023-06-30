#TODO: remove build if possible
all:clean run 

run:
	docker-compose up --build -d
 
clean:
	rm -rf build/*
	docker-compose down --volumes

down:
	docker-compose down