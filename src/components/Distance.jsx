const distance = ({ dep, arr, x }) => {
   return (
      <span id='distance'>
         <span id='dep'>{ dep }</span>
         <span id='line-p'>
            <span id='line' style={{width:`${x}%`}}></span>
         </span>
         <span id='arr'>{ arr }</span>
      </span>
   )
}
 
export default distance