!function(){function e(e,t){return new Promise((function(n,o){setTimeout((function(){Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.preventDefault();for(var n=+event.target.elements.delay.value,o=+event.target.elements.step.value,i=+event.target.elements.amount.value,a=n,c=1;c<=i;c+=1)e(c,a).then((function(e){var t=e.position,n=e.delay;Notiflix.Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;Notiflix.Notify.failure("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))})),a+=o}))}();
//# sourceMappingURL=03-promises.a6480a0f.js.map
