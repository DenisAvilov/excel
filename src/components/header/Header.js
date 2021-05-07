import {Component} from '../../core/Component';

export class Header extends Component {
  // className its Root class this block
  static className = 'excel__header'
  toHTML() {
    return ` 
      <input type="text" class="input" value="новая таблица">
      <div>
          <div class="button">
              <span class="material-icons">
                  exit_to_app
              </span>                
          </div>
          <div class="button">
              <span class="material-icons">
                  delete_sweep
              </span>
          </div>
      </div>
  `
  }
}
