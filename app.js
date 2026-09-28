(function(){
  const live=document.querySelector('[data-live-clock]');
  function tick(){if(live)live.textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});}
  tick();setInterval(tick,60000);

  const board=document.querySelector('[data-work-board]');
  if(board){
    const states=[
      {name:'Scout',initials:'SC',task:'New account research completed.',status:'Active',cls:'pulse'},
      {name:'Follow',initials:'FO',task:'Reply detected. Preparing next touch.',status:'Active',cls:'pulse'},
      {name:'Trace',initials:'TR',task:'Document check needs one missing field.',status:'Review',cls:''},
      {name:'Ledger',initials:'LE',task:'Invoice exception escalated to a human.',status:'Human',cls:''}
    ];
    let step=0;
    setInterval(()=>{
      const rows=[...board.querySelectorAll('.liveTask')];
      if(!rows.length)return;
      const s=states[step%states.length];
      const row=rows[step%rows.length];
      row.classList.remove('slideIn'); void row.offsetWidth; row.classList.add('slideIn');
      const name=row.querySelector('[data-name]'), initials=row.querySelector('[data-initials]'), copy=row.querySelector('[data-task]'), stat=row.querySelector('.status');
      if(name)name.textContent=s.name;if(initials)initials.textContent=s.initials;if(copy)copy.textContent=s.task;if(stat){stat.textContent=s.status;stat.className='status '+(s.status==='Review'?'wait':s.status==='Human'?'human':'');}
      step++;
    },3200);
  }

  const canvas=document.querySelector('[data-canvas]');
  if(canvas){
    const items=[...canvas.querySelectorAll('.workItem')];
    let i=0;
    setInterval(()=>{
      const item=items[i%items.length]; if(!item)return;
      item.classList.remove('slideIn'); void item.offsetWidth; item.classList.add('slideIn');
      i++;
    },2300);
  }

  const reveal=[...document.querySelectorAll('[data-reveal]')];
  if(reveal.length&&'IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('isIn');io.unobserve(e.target)}}),{threshold:.12});
    reveal.forEach(e=>io.observe(e));
  }

  const form=document.querySelector('[data-booking-form]');
  if(form)form.addEventListener('submit',function(e){e.preventDefault();window.open('https://calendly.com/growstackup/15min','_blank','noopener,noreferrer')});
})();