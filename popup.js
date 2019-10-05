function commarize(min) {
  min = min || 1e3;
  if (this >= min) {
    var units = ["k", "M", "B", "T"];
    
    var order = Math.floor(Math.log(this) / Math.log(1000));
    var num = Math.floor(this / 1000 ** order);

    return Math.floor(this / 1000 ** order) + units[(order - 1)]
  }
  
  return this.toLocaleString()
}

Number.prototype.commarize = commarize
String.prototype.commarize = commarize

let total = document.getElementById('total')
let stats = localStorage.getItem('blocked_events')

if (undefined != stats) {
	total.innerHTML = stats.commarize(0)
}

document.addEventListener('DOMContentLoaded', () => {
	document
		.getElementById('reset')
		.addEventListener('click', () => {
			localStorage.removeItem('blocked_events') 
			total.innerHTML = 0
		})
});