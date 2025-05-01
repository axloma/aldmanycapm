import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Crud, DataSourceCache } from '@toolpad/core/Crud';
import { useDemoRouter } from '@toolpad/core/internal';
import {  Show } from '@toolpad/core/Crud';

import Datagrid from "./page"
const NAVIGATION = [
  {
    segment: 'notes',
    title: 'Notes',
    icon: <StickyNote2Icon />,
    pattern: 'notes{/:noteId}*',
  },
  {
    segment: 'page',
    title: 'Notes',
    icon: <StickyNote2Icon />,
    // pattern: 'notes{/:noteId}*',
  },
  {
    segment: 'create',
    title: 'createuser',
    icon: <StickyNote2Icon />,
    // pattern: 'notes{/:noteId}*',
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

let notesStore = [
  { id: 1, title: 'Grocery List Item', text: 'Buy more coffee.' },
  { id: 2, title: 'Personal Goal', text: 'Finish reading the book.' },
];

export const notesDataSource = {
  fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'text', headerName: 'Text', flex: 1 },
  ],
  getMany: async ({ paginationModel, filterModel, sortModel }) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    let processedNotes = [...notesStore];

    // Apply filters (demo only)
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        processedNotes = processedNotes.filter((note) => {
          const noteValue = note[field];

          switch (operator) {
            case 'contains':
              return String(noteValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case 'equals':
              return noteValue === value;
            case 'startsWith':
              return String(noteValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case 'endsWith':
              return String(noteValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            case '>':
              return noteValue > value;
            case '<':
              return noteValue < value;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (sortModel?.length) {
      processedNotes.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field] < b[field]) {
            return sort === 'asc' ? -1 : 1;
          }
          if (a[field] > b[field]) {
            return sort === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedNotes = processedNotes.slice(start, end);

    return {
      items: paginatedNotes,
      itemCount: processedNotes.length,
    };
  },
  getOne: async (noteId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    const noteToShow = notesStore.find((note) => note.id === Number(noteId));

    if (!noteToShow) {
      throw new Error('Note not found');
    }
    return noteToShow;
  },
  createOne: async (data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    const newNote = {
      id: notesStore.reduce((max, note) => Math.max(max, note.id), 0) + 1,
      ...data,
    };

    notesStore = [...notesStore, newNote];

    return newNote;
  },
  updateOne: async (noteId, data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    let updatedNote = null;

    notesStore = notesStore.map((note) => {
      if (note.id === Number(noteId)) {
        updatedNote = { ...note, ...data };
        return updatedNote;
      }
      return note;
    });

    if (!updatedNote) {
      throw new Error('Note not found');
    }
    return updatedNote;
  },
  deleteOne: async (noteId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    notesStore = notesStore.filter((note) => note.id !== Number(noteId));
  },
  validate: (formValues) => {
    let issues = [];

    if (!formValues.title) {
      issues = [...issues, { message: 'Title is required', path: ['title'] }];
    }

    if (formValues.title && formValues.title.length < 3) {
      issues = [
        ...issues,
        {
          message: 'Title must be at least 3 characters long',
          path: ['title'],
        },
      ];
    }

    if (!formValues.text) {
      issues = [...issues, { message: 'Text is required', path: ['text'] }];
    }

    return { issues };
  },
};

const notesCache = new DataSourceCache();

function matchPath(pattern, pathname) {
  const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, '([^/]+)')}$`);
  const match = pathname.match(regex);
  return match ? match[1] : null;
}

function CrudBasic(props) {
  let peopleStore = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 6, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 7, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
  const { window } = props;

  const router = useDemoRouter('/notes');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const title = React.useMemo(() => {
    if (router.pathname === '/notes/new') {
      return 'New Note';
    }
    const editNoteId = matchPath('/notes/:noteId/edit', router.pathname);
    if (editNoteId) {
      return `Note ${editNoteId} - Edit`;
    }
    const showNoteId = matchPath('/notes/:noteId', router.pathname);
    if (showNoteId) {
      return `Note ${showNoteId}`;
    }

    return undefined;
  }, [router.pathname]);


// ////////////
 const peopleDataSource = {
  fields: [
    { field: 'id', headerName: 'ID' },
    {
      field: 'firstName',
      headerName: 'First name',
    },
    {
      field: 'lastName',
      headerName: 'Last name',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
    },
  ],
  getOne: async (personId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    const personToShow = peopleStore.find(
      (person) => person.id === Number(personId),
    );

    if (!personToShow) {
      throw new Error('Person not found');
    }
    return personToShow;
  },
  deleteOne: async (personId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    peopleStore = peopleStore.filter((person) => person.id !== Number(personId));
  },
};
const peopleCache = new DataSourceCache();

function CrudShow(props) {
  const { window } = props;
}
  //  router = useDemoRouter('/people/1');

  // // Remove this const when copying and pasting into your project.
  //  demoWindow = window !== undefined ? window() : undefined;

  const handleEditClick = React.useCallback((personId) => {
    console.log(`Edit click with id ${personId}`);
  }, []);

  const handleDelete = React.useCallback((personId) => {
    console.log(`Person with id ${personId} deleted`);
  }, []);

// const peopleCache = new DataSourceCache();

// function CrudShow(props) {
//   const { window } = props;

//   const router = useDemoRouter('/people/1');

//   // Remove this const when copying and pasting into your project.
//   const demoWindow = window !== undefined ? window() : undefined;

//   const handleEditClick = React.useCallback((personId) => {
//     console.log(`Edit click with id ${personId}`);
//   }, []);

//   const handleDelete = React.useCallback((personId) => {
//     console.log(`Person with id ${personId} deleted`);
//   }, []);

//////////////////






  
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <PageContainer title={title}>
          {/* preview-start */}
          <Crud
            dataSource={notesDataSource}
            dataSourceCache={notesCache}
            rootPath="/notes"
            initialPageSize={10}
            defaultValues={{ title: 'New note' }}
          />
          
          {/* preview-end */}
        </PageContainer>
        <PageContainer title={title}>
          {/* preview-start */}
          <Datagrid/>
          
          {/* preview-end */}
        </PageContainer>
         <PageContainer title={title}>
          {/* preview-start */}
          <Datagrid/>
          
          {/* preview-end */}
        </PageContainer>
        <PageContainer title="Person">
          {/* preview-start */}
          <Show
            id={1}
            dataSource={peopleDataSource}
            dataSourceCache={peopleCache}
            onEditClick={handleEditClick}
            onDelete={handleDelete}
          />
          {/* preview-end */}
        </PageContainer>

      </DashboardLayout>
    </AppProvider>
  );
}

CrudBasic.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default CrudBasic;
