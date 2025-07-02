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
```
---

## Використання


Базові кнопки з варіантами стилю, іконками та підтримкою стану disabled.


```bash
<Button variant="primary" startIcon={<FaCoffee />}>Primary</Button>
<Button variant="secondary" endIcon={<FaArrowRight />}>Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger" disabled>Danger (disabled)</Button>
```
Також підтримуються кастомні стилі:

```bash
<Button variant="cyberpunk">Hacker Mode</Button>
<Button variant="glow">Glowing Future</Button>
```
Поля вводу (InputField)
Підтримка різних типів: текст, textarea, чекбокс, select.

```bash
<InputField label="Ім'я" type="text" value={name} onChange={...} placeholder="Введіть ім'я" />
<InputField label="Опис" type="textarea" value={desc} onChange={...} />
<InputField label="Підписатися" type="checkbox" checked={subscribed} onChange={...} />
<InputField label="Вибір" type="select" value={fruit} onChange={...} options={[
  { label: 'Яблуко', value: 'apple' },
  { label: 'Банан', value: 'banana' },
]} />
```
Перемикачі (ToggleSwitch)
Перемикачі з різними візуальними стилями (варіантами):

```bash
<ToggleSwitch checked={isPastel} onChange={setIsPastel} label="Pastel" variant="pastel" />
<ToggleSwitch checked={isGlass} onChange={setIsGlass} label="Glassmorphism" variant="glass" />
<ToggleSwitch checked={isNeumorphism} onChange={setIsNeumorphism} label="Neumorphism" variant="neumorphism" />
```

### Toast Notifications

Використання кнопок для показу toast-повідомлень різних типів:

```bash
<Button
  variant="primary"
  onClick={() =>
    showToast({
      message: 'Успішно збережено!',
      type: 'success',
      variant: 'pastel',
    })
  }
>
  Success
</Button>

<Button
  variant="danger"
  onClick={() =>
    showToast({
      message: 'Сталася помилка!',
      type: 'error',
      variant: 'glass',
    })
  }
>
  Error
</Button>

<Button
  variant="outline"
  onClick={() =>
    showToast({
      message: 'Це інформація',
      type: 'info',
      variant: 'retro',
    })
  }
>
  Info
</Button>
```


---
### Календарі (DatePicker)

Підтримка одиночного вибору дати та діапазону дат у різних стилях.

```tsx
<DatePicker
  value={dateRange.start}
  onChange={(date) => setDateRange({ ...dateRange, start: date })}
/>

<DatePicker
  className="date-picker dark"
  value={dateRange.end}
  onChange={(date) => setDateRange({ ...dateRange, end: date })}
  range
/>

<DatePicker
  rangeMode
  value={dateRange1}
  onChange={setDateRange1}
  className="date-picker2"
/>

<DatePicker
  rangeMode
  value={dateRange2}
  onChange={setDateRange2}
  className="date-picker2 dark"
/>

<DatePicker
  rangeMode
  value={dateRange1}
  onChange={setDateRange1}
  className="date-picker3"
/>

<DatePicker
  rangeMode
  value={dateRange2}
  onChange={setDateRange2}
  className="date-picker3 dark"
/>
```
---

## Вертикальний таймлайн (Activity Timeline)
Компонент для відображення активностей у вигляді вертикальної стрічки.

```tsx
<Button onClick={() => setDarkMode(!darkMode)} style={{ marginBottom: '20px' }}>
  Перемкнути тему
</Button>

<TimeLine items={items} darkMode={darkMode} />\
```
---
## Горизонтальний таймлайн
```tsx
<Button
  variant="glass"
  onClick={() => setDarkMode(!darkMode)}
  style={{ marginBottom: '20px' }}
>
  {darkMode ? 'Світла тема' : 'Темна тема'}
</Button>

<HorizontalTimeline steps={steps} darkMode={darkMode} />
```
---

## Рейтинг зі слайдером (GradientSliderRating)
```tsx
<GradientSliderRating
  value={rating}
  onChange={setRating}
  colors={['#ff4d4f', '#ffc53d', '#73d13d']}
  labels={['Жахливо', 'Так собі', 'Супер']}
/>
```
---
## Піксельний рейтинг (PixelArtRating)
```tsx
<PixelArtRating
  value={rating}
  onChange={(newValue) => setRating(newValue)}
  max={5} // кількість іконок (дефолт 5)
  iconType="heart" // 'heart' | 'potion' | 'star' (опціонально)
/>
```
---
## Форми реєстрації
```tsx

<RegisterForm />
<RegisterForm2 />
<RegisterForm3 />
```
---
## Редактор тексту (RichTextEditor)
Повнофункціональний редактор з панеллю інструментів і кастомними стилями.

```tsx

<RichTextEditor
  placeholder="Почніть писати тут..."
  toolbar={[
    'bold',
    'italic',
    'underline',
    'link',
    'unordered-list',
    'ordered-list',
    'blockquote',
    'code-block',
    'image',
    'video',
    'emoji',
    'clear-formatting',
    'font-size',
    'text-color',
    'background-color',
    'align-left',
    'align-center',
    'align-right',
    'align-justify',
  ]}
  style={{
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  }}
/>
```
---

### Checkbox Group

Групи чекбоксів з підтримкою вибору кількох опцій.

```tsx
<CheckboxGroup
  legend="Checkbox"
  options={options}
  selectedValues={selected}
  onChange={setSelected}
/>

<CheckboxGroupMinimal
  legend="Checkbox"
  options={options}
  selected={selected}
  onChange={setSelected}
/>
```

---

## Таблиця (DataTable)
Таблиця з підтримкою темної/світлої теми, пагінації, експорту та вибору рядків.

```tsx
Копіювати
Редагувати
<div className={`data-table ${isDarkMode ? 'dark' : ''}`}>
  <Button variant="primary" onClick={() => setIsDarkMode(!isDarkMode)}>
    {isDarkMode ? 'Світла тема' : 'Темна тема'}
  </Button>

  <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
    <h1>Таблиця працівників</h1>
    <DataTable
      columns={columns}
      data={initialData}
      pageSize={10}
      enableExport
      onRowSelect={handleRowSelect}
      localStorageKey="employees-table"
    />
  </div>
</div>
```
---

## Графіки (Chart)
Різні типи графіків: лінійний, стовпчиковий, кругова діаграма, мультиосьовий, бульбашковий.

``` tsx

<Chart
  data={data}
  type="line"
  xKey="name"
  yKey="uv"
  title="Лінійний графік UV"
  colors={['#3b82f6']}
  darkMode={false}
/>

<Chart
  data={data}
  type="bar"
  xKey="name"
  yKey="pv"
  title="Стовпчиковий графік PV"
  colors={['#f97316']}
  darkMode={true}
/>

<Chart
  data={data}
  type="pie"
  xKey="name"
  yKey="uv"
  title="Кругова діаграма UV"
  colors={['#facc15', '#22c55e', '#38bdf8', '#ec4899', '#a78bfa']}
  darkMode={false}
/>
```
---
## Картки (Cards)
Сітка перевертальних карток та звичайна сітка карток.

```tsx
Копіювати
Редагувати
<FlippingCardGrid cards={cardsData} />

<CardGrid cards={cards} />
```
---
## Карусель (ReusableCarousel)
Перевикористовується для створення слайдера зображень.

```tsx

<ReusableCarousel items={imageUrls} />
```
---
### Карусель (Carousel)

Простий карусельний слайдер з налаштуваннями ширини і висоти:

```tsx
<section>
  <Carousel items={images} width={400} height={400} />
</section>
```
---
## Навігаційна панель (Navbar)
Навбар з логотипом, меню та підменю. Підтримка світлої і темної теми.

```tsx

<Navbar
  logo={<span> yuch-ui</span>}
  items={[
    { label: 'Головна', href: '/' },
    {
      label: 'Меню',
      submenu: [
        { label: 'Button', href: '/button' },
        { label: 'Toast', href: '/toast' },
        { label: 'Slider', href: '/slider' },
      ],
    },
    { label: 'Документація', href: '/docs' },
  ]}
/>

{/* Темна тема */}
<Navbar
  darkMode
  logo={<span> yuch-ui</span>}
  items={[
    { label: 'Головна', href: '/' },
    {
      label: 'Меню',
      submenu: [
        { label: 'Button', href: '/button' },
        { label: 'Toast', href: '/toast' },
        { label: 'Slider', href: '/slider' },
      ],
    },
    { label: 'Документація', href: '/docs' },
  ]}
/>
<MultiAxisLineChart data={data2} darkMode={true} />
```
---

## Бічна панель (Sidebar)
Бічне меню з підтримкою темної теми.

```tsx
Копіювати
Редагувати
<div style={{ display: 'flex' }}>
  <Sidebar items={items1} darkMode={true} />
  <main style={{ padding: 20, flexGrow: 1 }}>
    {/* Основний контент */}
  </main>
</div>
```


<BubbleChart data={data3} darkMode={true} />
```
