import React from 'react'
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  Tooltip,
  Divider,
  Paper
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import HelpIcon from '@material-ui/icons/Help'

const PagesCheckList = ({ elements, classes, hasSubPages }) => {
  const { h1, p, h2, h3, columns, subPages } = elements

  const renderSubPageResults = () => {
    return elements.subPages.map(({ page, elements }) => (
      <List
        key={page}
        subheader={
          <ListSubheader className={classes.pageTitle} disableSticky>
            Sub page {page}
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemIcon>
            {elements.h1 && elements.h1 === 1 ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <ErrorIcon color='error' />
            )}
          </ListItemIcon>
          Heading One: Found {elements.h1}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {elements.p ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <ErrorIcon color='error' />
            )}
          </ListItemIcon>
          Paragraphs: Found {elements.p}
        </ListItem>
      </List>
    ))
  }

  return (
    <Paper>
      <List>
        <ListSubheader className={classes.pageTitle} disableSticky>
          Main page
        </ListSubheader>
        <ListItem>
          <ListItemIcon>
            {h1 && h1 === 1 ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <Tooltip
                title='A heading at level one (h1) is missing'
                placement='right'
              >
                <ErrorIcon color='error' />
              </Tooltip>
            )}
          </ListItemIcon>
          Heading One: Found {h1}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {h2 >= 2 || h3 >= 2 ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <Tooltip
                title='There should be at least two headings at level two or three (h2 / h3)'
                placement='right'
              >
                <ErrorIcon color='error' />
              </Tooltip>
            )}
          </ListItemIcon>
          Heading Two or Three: Found {h2 + h3}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {p ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <Tooltip
                title='There should be at least one paragraph on the main page (p element)'
                placement='right'
              >
                <ErrorIcon color='error' />
              </Tooltip>
            )}
          </ListItemIcon>
          Paragraphs: Found {p}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {columns >= 2 ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <Tooltip
                placement='right'
                title='If you did not use the Gutenberg editor, we will not find any columns. Do not worry, you can still hand in and we will verify.'
              >
                <ErrorIcon color='error' />
              </Tooltip>
            )}
          </ListItemIcon>
          Columns: Found {columns}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {hasSubPages() ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <Tooltip
                title='There should be a link to at least one sub page on the main page'
                placement='right'
              >
                <ErrorIcon color='error' />
              </Tooltip>
            )}
          </ListItemIcon>
          Sub pages: Found {hasSubPages() ? subPages.length : 0}
          {hasSubPages() && subPages.length >= 20 && (
            <ListItemIcon>
              <Tooltip
                title='We have only scanned the first 20 sub pages found'
                placement='right'
              >
                <HelpIcon fontSize='small' />
              </Tooltip>
            </ListItemIcon>
          )}
        </ListItem>
      </List>
      <Divider />
      {hasSubPages() && renderSubPageResults()}
    </Paper>
  )
}

export default PagesCheckList
