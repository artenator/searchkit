import * as _ from "lodash";
import * as React from "react";
import "../styles/index.scss";

import {
	SearchkitComponent,
	PageSizeAccessor,
	ImmutableQuery,
	HighlightAccessor,
	SearchkitComponentProps
} from "../../../../core"

export interface HitsProps extends SearchkitComponentProps{
	hitsPerPage: number
	highlightFields?:Array<string>
}

export class Hits extends SearchkitComponent<HitsProps, any> {

	componentWillMount() {
		super.componentWillMount()
		if(this.props.highlightFields) {
			this.searchkit.addAccessor(
				new HighlightAccessor(this.props.highlightFields))
		}
	}

	defineAccessor(){
		return new PageSizeAccessor(this.props.hitsPerPage)
	}

	defineBEMBlocks() {
		let block = (this.props.mod || "hits")
		return {
			container: block,
			item: `${block}-hit`
		}
	}

	renderResult(result:any) {
		return (
			<div data-qa="hit" className={this.bemBlocks.item().mix(this.bemBlocks.container("item"))} key={result._id}>
			</div>
		)
	}

	renderInitialView() {
		return (
			<div data-qa="initial-loading" className={this.bemBlocks.container("initial-loading")}></div>
		)
	}

	renderNoResults() {
		return (
			<div data-qa="no-results" className={this.bemBlocks.container("no-results")}>{this.translate("No results")}</div>
		)
	}

	render() {
		let hits:Array<Object> = this.getHits()
		let hasHits = hits.length > 0
		let results = null

		if (this.isInitialLoading()) {
			results = this.renderInitialView()
		} else if (!hasHits) {
			results = this.renderNoResults()
		} else {
			results = _.map(hits, this.renderResult.bind(this))
		}

		return (
			<div data-qa="hits" className={this.bemBlocks.container()}>
				{results}
      </div>
		);
	}
}
