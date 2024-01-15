.PHONY: dump_data run_local
VERSION := 1.0.0

include ./src/infrastructure/envs/.env.local
export

run_local:
	bash ./init.sh


