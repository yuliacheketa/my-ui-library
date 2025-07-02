# YUCH UI

Бібліотека UI-компонентів для React із сучасним, адаптивним та легким у використанні дизайном.

---

## Особливості

- Набір перевикористовуваних компонентів: кнопки, форми, модальні вікна, таблиці, таймлайни тощо
- Підтримка тем: світла, темна, пастельна
- Легка кастомізація через CSS Variables та пропси
- Анімації та приємний UX з мінімальним налаштуванням

---

## Технології

- React + TypeScript
- CSS Modules + CSS Variables
-  Vite 


---

## Встановлення

```bash
npm install yuch-ui
# або
yarn add yuch-ui

## Використання
## Кнопки (Button)
Базові кнопки з варіантами стилю, іконками та підтримкою стану disabled.



<Button variant="primary" startIcon={<FaCoffee />}>Primary</Button>
<Button variant="secondary" endIcon={<FaArrowRight />}>Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger" disabled>Danger (disabled)</Button>
Також підтримуються кастомні стилі:


<Button variant="cyberpunk">Hacker Mode</Button>
<Button variant="glow">Glowing Future</Button>
Поля вводу (InputField)
Підтримка різних типів: текст, textarea, чекбокс, select.


<InputField label="Ім'я" type="text" value={name} onChange={...} placeholder="Введіть ім'я" />
<InputField label="Опис" type="textarea" value={desc} onChange={...} />
<InputField label="Підписатися" type="checkbox" checked={subscribed} onChange={...} />
<InputField label="Вибір" type="select" value={fruit} onChange={...} options={[
  { label: 'Яблуко', value: 'apple' },
  { label: 'Банан', value: 'banana' },
]} />
Перемикачі (ToggleSwitch)
Перемикачі з різними візуальними стилями (варіантами):


<ToggleSwitch checked={isPastel} onChange={setIsPastel} label="Pastel" variant="pastel" />
<ToggleSwitch checked={isGlass} onChange={setIsGlass} label="Glassmorphism" variant="glass" />
<ToggleSwitch checked={isNeumorphism} onChange={setIsNeumorphism} label="Neumorphism" variant="neumorphism" />
