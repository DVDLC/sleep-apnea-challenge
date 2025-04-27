serve-patients:
	@cd supabase/functions/patients && deno task start

serve-auth:
	@cd supabase/functions/auth && deno task start

# This is an example how to implement other functions
# serve-other-function:
# 	cd supabase/functions/other-function && deno task start

serve-all:
	$(MAKE) serve-verify-patients &
	wait
