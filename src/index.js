/**
 * 
 * @authors linyi (782279031@qq.com)
 * @date    2018-03-04 12:36:25
 * @version $Id$
 */

import _ from 'lodash';
import './app.css';
function component() {

    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack4'], ' ');
    element.classList.add('red');

    return element;
  } 

document.body.appendChild(component())