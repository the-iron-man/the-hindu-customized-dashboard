import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import uniqBy from 'lodash/uniqBy'

import { minWidth } from '@material-ui/system'
// import { push } from 'connected-react-router'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import {
//   increment,
//   incrementAsync,
//   decrement,
//   decrementAsync
// } from '../../modules/counter'

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '36px',
    marginRight: '37px',
    padding: '40px',
    backgroundColor: 'navajowhite',
    border: '.5px dashed #3274d6',
    borderRadius: '4px',
    position: 'absolute',
    minWidth: '47%',
    overflowX: 'auto',
    height: 'calc(94% - 20px)'
  },
  title: {
    fontSize: '20px',
    padding: '4px'
  },
  header: {
    fontSize: '16px',
    padding: '4px',
    fontWeight: '700'
  },
  summary: {
    fontSize: '16px',
    padding: '4px',
    // textAlign: 'justify',
    margin: '4px'
    // lineHeight: '16px',
  },
  completeText: {
    fontSize: '16px',
    padding: '4px',
    // textAlign: 'justify',
    margin: '4px',
    // lineHeight: '14px',
    textAlign: 'justify'
    // fontFamily: 'Roboto'
  },
  summaryPoints: {
    // lineHeight: '14px',
    textAlign: 'justify',
    padding: '4px'
    // fontFamily: 'Roboto'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '2px',
    margin: '2px'
  },
  chip: {
    padding: '2px',
    margin: '2px'
  }
}

const Content = props => {
  const { classes, summary, category, title, url, text, ner_tags, date } = props
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return (
    <div>
      {title && (
        <div className={classes.content}>
          {' '}
          <div className={classes.title}>
            <a target="blank" href={url}>
              {title}
            </a>
          </div>
          <div className={classes.category}>
            <Chip
              label={category ? category : 'NA'}
              className={classes.chip}
              color="primary"
            />
            <Chip
              label={new Date(date).toDateString()}
              className={classes.chip}
              color="primary"
            />
            <Chip
              label={monthNames[new Date(date).getMonth()]}
              className={classes.chip}
              color="primary"
            />
          </div>
          <div className={classes.header}>PERSON</div>
          <div className={classes.tags}>
            {ner_tags && ner_tags['PERSON']
              ? uniqBy(ner_tags['PERSON'],(item)=>item.toUppercase).map(tag => (
                  <Chip
                    label={tag}
                    color="secondary"
                    className={classes.chip}
                  />
                ))
              : '-'}
          </div>
          <div className={classes.header}>ORG</div>
          <div className={classes.tags}>
            {ner_tags && ner_tags['ORG']
              ? uniqBy(ner_tags['ORG'],item => item.toLowerCase()).map(tag => (
                  <Chip
                    label={tag}
                    color="secondary"
                    className={classes.chip}
                  />
                ))
              : '-'}
          </div>
          <div className={classes.header}>PRODUCT</div>
          <div className={classes.tags}>
            {ner_tags && ner_tags['PRODUCT']
              ? uniqBy(ner_tags['PRODUCT'],item => item.toLowerCase()).map(tag => (
                  <Chip
                    label={tag}
                    color="secondary"
                    className={classes.chip}
                  />
                ))
              : '-'}
          </div>
          <div className={classes.header}>GPE</div>
          <div className={classes.tags}>
            {ner_tags && ner_tags['GPE']
              ? uniqBy(ner_tags['GPE'],item => item.toLowerCase()).map(tag => (
                  <Chip
                    label={tag}
                    color="secondary"
                    className={classes.chip}
                  />
                ))
              : '-'}
          </div>
          <div className={classes.header}>NORP</div>
          <div className={classes.tags}>
            {ner_tags && ner_tags['NORP']
              ? uniqBy(ner_tags['NORP'],item => item.toLowerCase()).map(tag => (
                  <Chip
                    label={tag}
                    color="secondary"
                    className={classes.chip}
                  />
                ))
              : '-'}
          </div>
          <div className={classes.header}>Summary</div>
          <div className={classes.summary}>
            {summary &&
              summary.map(point => (
                <li className={classes.summaryPoints}>{point}</li>
              ))}
          </div>
          <div className={classes.header}>Full Article</div>
          <div className={classes.completeText}>{text}</div>
        </div>
      )}
    </div>
  )
}
// const mapStateToProps = ({ counter }) => ({
//   count: counter.count,
//   isIncrementing: counter.isIncrementing,
//   isDecrementing: counter.isDecrementing
// })

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       increment,
//       incrementAsync,
//       decrement,
//       decrementAsync,
//       changePage: () => push('/about-us')
//     },
//     dispatch
//   )

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home)

Content.propTypes = {
  // classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Content)
