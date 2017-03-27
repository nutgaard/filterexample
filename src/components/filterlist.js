import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeFilter, clearFilter } from './../reducers/filter';

function Filterlist({ filter, actions }) {
    const entries = Object.entries(filter)
        .map(([formname, formfilter]) => {
            if (formfilter[formname]) {
                // RADIO
                return [ <li key={formname}><button onClick={() => actions.removeFilter(formname, formname)}>{formname}: {formfilter[formname]}</button></li> ];
            } else {
                return Object.entries(formfilter)
                    .filter(([_, value]) => value)
                    .map(([filtername]) => <li key={`${formname}-${filtername}`}><button onClick={() => actions.removeFilter(formname, filtername)}>{formname}: {filtername}</button></li>);
            }
        })
        .reduce((acc, l) => [...acc, ...l], []);

    return (
        <div>
            <ul>
                {entries}
                { entries.length > 0 && <button onClick={actions.clearFilter}>CLEAR ALL</button>}
            </ul>
        </div>
    );
}

Filterlist.propTypes = {};

const mapStateToProps = ({ filter }) => ({ filter });
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ removeFilter, clearFilter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Filterlist);
