<template>
	<div>
		<span v-show="!text.edit"
	          v-on:click="toggleEdit(this, text)"
	          title="Click to edit!">{{text.val}}</span>
	    
	    <textarea v-model="text.val"
	              v-show="text.edit"
	              v-on:blur="saveEdit(this, text)">
	    </textarea>
	    <!--input type="text"
	           v-model="text.val"
	           v-show="text.edit"
	           v-on:blur="saveEdit(ev, text)"/-->
    </div>
</template>

<script>
	export default {
		name: "EditableText",
		props: ["text"],
		data () {
			return {
				title:"ACME's Staff List",
			}
		},
		methods: {
			toggleEdit: function(ev, text){
				text.edit = !text.edit;
				// if (text.edit) {
				// 	Vue.nextTick(function() {
				// 		ev.$$.input.focus();
				// 	})   
				// }
			},
			saveEdit: function(ev, text){
		  		//save your changes
			  	this.toggleEdit(ev, text);
			  	this.$emit('update:text', text);
			}
		}
	}
</script>