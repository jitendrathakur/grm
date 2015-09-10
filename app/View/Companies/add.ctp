<div class="companies form" ng-controller="company">
<?php echo $this->Form->create('Company'); ?>
	<fieldset>
		<legend><?php echo __('Add Company'); ?></legend>
	<?php
		echo $this->Form->input('name', array('ng-model' => 'name'));
		echo $this->Form->input('tag', array('ng-model' => 'tag'));
		echo $this->Form->input('description', array('ng-model' => 'description'));
		echo $this->Form->input('city', array('ng-model' => 'city'));
		echo $this->Form->input('state', array('ng-model' => 'state'));
		echo $this->Form->input('country', array('ng-model' => 'country'));
		echo $this->Form->input('pincode', array('ng-model' => 'pincode'));
	?>
	</fieldset>

	<input type="button" value="submit" ng-click="submitForm()" />
<?php echo $this->Form->end(); ?>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Companies'), array('action' => 'index')); ?></li>
	</ul>
</div>
