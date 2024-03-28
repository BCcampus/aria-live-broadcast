/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { render, screen, waitForElementToBeRemoved, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { announce } from '.';

const TestComponent = () => {
  const [count, setCount] = useState(1);

  const handleClick = () => {
    announce(`Pass ${count}`, 'polite', 500);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Announce
      </button>
    </div>
  );
};

const setup = () => {
  const user = userEvent.setup({ delay: 50 });
  const utils = render(<TestComponent />);
  const button = screen.getByRole('button');

  return { user, button, ...utils };
};

it('renders a single broadcast root after interactions', async () => {
  const { user, button } = setup();

  await act(() => user.click(button));
  await act(() => user.click(button));

  const log = await screen.findAllByRole('log');
  expect(log).toHaveLength(2);

  await waitForElementToBeRemoved(() => screen.queryAllByText(/Pass \d/), {
    timeout: 1000,
    interval: 200,
  });
});

it('announces messages', async () => {
  const { user, button } = setup();

  await act(() => user.click(button));
  expect(screen.getByText('Pass 1')).toBeInTheDocument();

  await act(() => user.click(button));
  expect(screen.getByText('Pass 2')).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryAllByText(/Pass \d/), {
    timeout: 1000,
    interval: 200,
  });
});

it('removes old messages', async () => {
  const { user, button } = setup();

  await act(() => user.click(button));
  await act(() => user.click(button));

  await waitForElementToBeRemoved(() => screen.queryAllByText(/Pass \d/), {
    timeout: 1000,
    interval: 200,
  });
});
