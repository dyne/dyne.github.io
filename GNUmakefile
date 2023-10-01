
broken-links:
	curl 'https://broken.dyne.org/api/collections/broken_links/records?fields=href&perPage=1000' | jq .items[].href | sort | uniq -c | sort -nr -k1,1
