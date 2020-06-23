export default class Progress {

  /**
	 * @描述     画顶部状态线
	 * @开发     stephen
	 * @时间     2019-05-16
	 * @param  {[type]}   val [description]
	 * @return {[type]}       [description]
	 */
  static drawTopLine(val) {
    let lineDom = document.querySelector('.http-line');
    lineDom.style.visibility = 'visible';
    lineDom.style.width = `${val}%`;

    if (val === 100) {
      let timeId = setTimeout(function(){
        lineDom.style.visibility = 'hidden';
        clearTimeout(timeId);
        timeId = null;
      }, 150);
    }
  }
}
