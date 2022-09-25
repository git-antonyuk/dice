export default function debounce(func: Function, wait: number, immediate?: boolean) {
  let timeout: number | undefined;

  return function executedFunction() {
    //@ts-ignore
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};
