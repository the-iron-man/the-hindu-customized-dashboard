import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import Article from '../card'
import Content from './content'
import filter from 'lodash/filter'
import { assignIds } from '../../modules/selector'

// import { push } from 'connected-react-router'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import {
//   increment,
//   incrementAsync,
//   decrement,
//   decrementAsync
// } from '../../modules/counter'

const date = new Date()
const todayDate = date.getFullYear() + "_" + ("0" + (date.getMonth() + 1)).slice(-2)  + "_" + date.getDate()

// const articles = require('../../articles.json')
const articles = require(`../../${todayDate}.json`)

const TABS_ARRAY = [
  'Front page',
  'National',
  'International',
  'Business',
  'Opinion',
  // 'Favorited',
  // 'WordCloud'
]

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  cardSection: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '40%',
    maxWidth: '40%',
    minWidth: '30%',
    maxHeight: '100vh',
    overflowX: 'auto',
    paddingBottom: '12px',
    margin: '4px 6px 4px 6px '
  },
  tabBar: {
    backgroundColor: '#1976d2',
    color: '#fff'
  },
  header: {
    fontSize: '16px',
    padding: '8px',
    fontWeight: '700',
    float: 'right !important',
    margin: '5px'
  }
}

// import React from 'react';
// import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articlesWithIdentifier: [],// Original List of articles
      updatedArticles: [],//These articles Keep on getting updated
      selectedArticle: {},
      selectedTabId: null
    }
    this.handleArticleId = this.handleArticleId.bind(this)
  }

  componentWillMount() {

    const articlesWithIdentifier = assignIds(articles)
    this.setState({
      articlesWithIdentifier: articlesWithIdentifier,
      updatedArticles: articlesWithIdentifier
    })
  }

  handleTabChange = (e, id) => {
    const tabArticles = this.state.articlesWithIdentifier
      ? filter(
          this.state.articlesWithIdentifier,
          article => article.category === TABS_ARRAY[id]
        )
      : null

    this.setState((state, props) => {
      return { selectedTabId: id, updatedArticles: tabArticles }
    })
  }
  handleArticleId(id) {
    const newSelectedArticle =
      this.state.articlesWithIdentifier.length > 0
        ? this.state.articlesWithIdentifier.filter(article => article.id === id)
        : {}

    this.setState((state, props) => {
      return { selectedArticle: newSelectedArticle[0] }
    })
  }
  render() {
    let selectedArticle = this.state.selectedArticle

    const { classes } = this.props

    return (
      <div>
        <Tabs className={classes.tabBar} onChange={this.handleTabChange}>
          {TABS_ARRAY.map((tab, index) => (
            <Tab label={tab} value={index} />
          ))}
        </Tabs>
        {this.state.selectedTabId ? (
          <div className={classes.header}>
            {TABS_ARRAY[this.state.selectedTabId]} (
            {this.state.updatedArticles ? this.state.updatedArticles.length : 0}
            )
          </div>
        ) : null}

        <div className={classes.container}>
          <div className={classes.cardSection}>
            {this.state.updatedArticles &&
              this.state.updatedArticles.map(article => (
                <Article
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  details={article.summary}
                  category={article.category}
                  setArticleId={this.handleArticleId}
                  date={article.date ? article.date : '-'}
                />
              ))}
          </div>
          <Content
            summary={selectedArticle.summary}
            category={selectedArticle.category}
            title={selectedArticle.title}
            url={selectedArticle.url}
            text={selectedArticle.text}
            ner_tags={selectedArticle.ner_tags}
            date={selectedArticle.date ? selectedArticle.date : '-'}
          />
        </div>
      </div>
    )
  }
}
// const mapStateToProps = state => ({
//   articleId: state.articleId
// })
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

Home.propTypes = {
  // classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
