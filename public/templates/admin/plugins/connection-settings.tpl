<form role="form" class="connection-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">General</div>
		<div class="col-sm-10 col-xs-12">
			<p class="lead">
				Fields Required to Connect
			</p>
			<div class="form-group">
				<div class="checkbox">
					<label>
						<input name="username" class="group-type-checkbox" type="checkbox" /> <strong>Username</strong>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input name="email" class="group-type-checkbox" type="checkbox" /> <strong>Email</strong>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input name="fullname" class="group-type-checkbox" type="checkbox" /> <strong>Full Name</strong>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input name="website" class="group-type-checkbox" type="checkbox" /> <strong>Website</strong>
					</label>
				</div>
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>

<script>
require(['settings'], function(Settings) {
		Settings.load('connection', $('.connection-settings'));
		$('#save').on('click', function() {
			Settings.save('connection', $('.connection-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'connection-settings-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	});
</script>