export function SeedGreetingFromTime() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html:
          "(function(){var h=new Date().getHours();var g=h<12?'Good morning':h<18?'Good afternoon':'Good evening';var el=document.querySelector('[data-greeting]');if(el)el.textContent=g})()",
      }}
    />
  );
}
