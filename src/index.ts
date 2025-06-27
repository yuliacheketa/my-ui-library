export const version = '0.0.1';

export function greet(name: string): string {
  return `Привіт, ${name}! Це моя власна UI-лібра 🎉`;
}
import './index.css';


import './components/Button/Button.css';
import './components/ToggleSwitch/ToggleSwitch.css';
export { default as Button } from './components/Button/Button';
export { default as ToggleSwitch } from './components/ToggleSwitch/ToggleSwitch';


export { default as ToastProvider } from './components/Toast/ToastContainer';
export { useToast } from './components/Toast/ToastContainer';


import './components/Modal/Modal.css';
export { default as Modal } from './components/Modal/Modal';

import './components/DatePicker/DatePicker.css';
export { default as DatePicker } from './components/DatePicker/DatePicker';

import './components/TimeLine/TimeLine.css';

export { default as TimeLine } from './components/TimeLine/TimeLine';



import './components/HorizontalTimeline/HorizontalTimeline.css';

export { default as HorizontalTimeline } from './components/HorizontalTimeline/HorizontalTimeline'; 


import './components/GradientSliderRating/GradientSliderRating.css';
export { default as GradientSliderRating } from './components/GradientSliderRating/GradientSliderRating'; 

import './components/XPProgress/XPProgress.css';
export { default as XPProgress } from './components/XPProgress/XPProgress';

import './components/PixelArtRating/PixelArtRating.css';
export { default as PixelArtRating } from './components/PixelArtRating/PixelArtRating';

export { default as RadialMeter } from './components/RadialMeter/RadialMeter';  

import './components/RegisterForm/RegisterForm.css';
export { default as RegisterForm } from './components/RegisterForm/RegisterForm';


import './components/RegisterForm2/RegisterForm2.css';
export { default as RegisterForm2 } from './components/RegisterForm2/RegisterForm2';

export { default as RegisterForm3 } from './components/RegisterForm3/RegisterForm3';

export { default as RichTextEditor } from './components/RichTextEditor/RichTextEditor';

export {  default as Modal2 } from './components/Modal2/Modal2';

export {  default as Modal3 } from './components/Modal3/Modal3';

export { default as Modal4 } from './components/Modal4/Modal4';

import './components/CheckBoxGroup/CheckBoxGroup.css';
export { default as CheckboxGroup } from './components/CheckBoxGroup/CheckBoxGroup';  


import './components/CheckboxGroupMinimal/CheckboxGroupMinimal.css';
export { default as CheckboxGroupMinimal } from './components/CheckboxGroupMinimal/CheckboxGroupMinimal';

import './components/DataTable/DataTable.css';
export { default as DataTable } from './components/DataTable/DataTable';  
