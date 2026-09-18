# Country_task

## How to install and run the project locally

```bash
cd my-country-app
npm install
npm run dev
```

## Stack

* **React** — for building reusable UI components.
* **TypeScript** — for type safety.
* **Vite** — for a fast and simple development setup.
* **Tailwind CSS** — for styling and responsive design.

I chose this stack because React, TypeScript, Vite, and Tailwind CSS work well together and provide a fast, maintainable way to build a responsive frontend application.

## Improvements with more time

With more time, I would improve the visual design and add a spinner or skeleton loading state for better visual feedback while the data is loading.

I would also improve the error state with a more polished UI and add a success/empty state to clearly communicate when the data has loaded successfully or when there are no results.

## Working With AI Tools

I used GitHub Copilot in VS Code primarily to implement the **responsive layout** of the country card components. I also used it for several styling improvements, including dark mode text styling, spacing, borders, and the loading state styling.

### Prompts

The prompts below are close to the original prompts I used.

**1. Responsive layout**

> I want you to help me make the country components responsive for all screen sizes: phone, tablet, and desktop.

**2. Search input styling**

> I want to add a border to the search input and make the text have the correct color in dark and light mode so it is more visible and readable.

**3. Dark mode button styling**

> Also add a border to the dark mode button.

**4. Dark mode text styling**

> The text in the country card is not visible in dark mode. I want everything to be clearly visible.

**5. Spacing**

> In the h2 name I want a little space between the span and the country name. Maybe padding or something else?

**6. Loading state styling**

> Only the loading text should be styled correctly on the full screen.

### What the AI got right

Copilot correctly implemented the responsive grid for the country cards and added responsive layouts for phones, tablets, and desktops. It also helped make the country cards responsive, including responsive spacing, image sizing, and the metadata layout. The header and search controls were also adjusted to work better on smaller screens.

### What the AI got wrong

The first AI-generated styling did not fully match the requirements. The text was not always readable in both dark and light mode. The search input and dark/light mode button were missing borders. There was also not enough spacing between the `<span>` and the country name in the `<h2>`. The loading text also did not have the styling needed to display correctly on the full screen.

### What I changed

After reviewing the generated code, I changed the `div` to a semantic `<ul>` and the `p` elements to `<li>` elements in the Country component because I felt the structure was more appropriate for the country details. I also added `<span>` elements because the original structure did not look good and I felt they were necessary for better styling and structure.

### Would I ship the AI output as-is?

After reviewing and testing everything, I think the final styling looks good and meets the requirements I was aiming for. However, I would still review and test AI-generated code before shipping it to make sure it works correctly and meets the project requirements.
