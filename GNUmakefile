
broken-links:
	curl 'https://broken.dyne.org/api/collections/broken_links/records?fields=href&perPage=1000' | jq -r .items[].href | sort | uniq -c | sort -nr -k1,1

domains:
	curl "https://broken.dyne.org/api/collections/broken_links/records?filter=(pathname='/')&fields=href&perPage=1000" | jq -r .items[].href | sort | uniq

clean:
	rm -rf *-lock* node_modules
