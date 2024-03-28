import React, { useEffect, useState } from 'react';
import { Group, Paper, Text } from '@mantine/core';
import {
  Composite,
  FocusOptions,
  SelectionOptions,
  SelectionState,
} from '@bccampus/react-composite';
import { MantineDemo } from '@mantinex/demo';
import { IconSquareCheck, IconSquare } from '@tabler/icons-react';
import { announce } from '@bccampus/aria-live-broadcast';
import classes from './Composite.demo.module.css';

import { people } from './_data';

const focusOptions: FocusOptions = { loop: true };
const selectionOptions: SelectionOptions = { multiple: true };
function Demo() {
  const [selections, setSelections] = useState<SelectionState>({ selected: new Set() });

  useEffect(() => {
    if (selections.selected.size === 0) {
      announce('No employees selected');
    } else if (selections.selected.size === people.length) {
      announce('All employees selected');
    } else if (selections.selected.size > 1) {
      announce(`${selections.selected.size} employees selected`, 'assertive');
    }
  }, [selections]);

  return (
    <Composite
      type="VerticalListbox"
      items={people}
      focusOptions={focusOptions}
      selectionOptions={selectionOptions}
      selectionState={selections}
      onSelectionChange={setSelections}
      renderItem={({ item, ...props }, { selected, onSelectMouseEventHandler }) => (
        <Paper
          {...props}
          withBorder
          p="xs"
          my="xs"
          miw="15rem"
          className={classes.compositeItem}
          onClickCapture={onSelectMouseEventHandler}
        >
          <Group>
            <div>{selected ? <IconSquareCheck /> : <IconSquare />}</div>
            <div>
              <Text fw={500}>{item.fullname}</Text>
              <Text size="sm" c="dimmed">
                {item.title}
              </Text>
            </div>
          </Group>
        </Paper>
      )}
    />
  );
}

const cellCode = `
const focusOptions: FocusOptions = { loop: true };
const selectionOptions: SelectionOptions = { multiple: true };
function Demo() {
  const [selections, setSelections] = useState<SelectionState>({ selected: new Set() });

  useEffect(() => {
    if (selections.selected.size === 0) {
      announce('No employees selected');
    } else if (selections.selected.size === people.length) {
      announce('All employees selected');
    } else if (selections.selected.size > 1) {
      announce(\`\${selections.selected.size} employees selected\`, 'assertive');
    }
  }, [selections]);

  return (
    <Composite
      type="VerticalListbox"
      items={people}
      focusOptions={focusOptions}
      selectionOptions={selectionOptions}
      selectionState={selections}
      onSelectionChange={setSelections}
      renderItem={({ item, ...props }, { selected, onSelectMouseEventHandler }) => (
        <Paper
          {...props}
          withBorder
          p="xs"
          my="xs"
          miw="15rem"
          className={classes.compositeItem}
          onClickCapture={onSelectMouseEventHandler}
        >
          <Group>
            <div>{selected ? <IconSquareCheck /> : <IconSquare />}</div>
            <div>
              <Text fw={500}>{item.fullname}</Text>
              <Text size="sm" c="dimmed">
                {item.title}
              </Text>
            </div>
          </Group>
        </Paper>
      )}
    />
  );
}
`;

export const basicList: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    {
      code: cellCode,
      language: 'tsx',
      fileName: 'basicList.tsx',
    },
  ],
  centered: true,
  withPadding: false,
};
