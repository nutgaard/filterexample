import React, { Component, PropTypes as PT } from 'react';
import Collapse from 'react-collapse';
import './expandablepanel.scss';

class Expandablepanel extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: this.props.isOpen };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { title, children, className } = this.props;
        const cls = ['expandablepanel', className, this.state.isOpen ? 'expandablepanel--open' : ''].join(' ');
        return (
            <div className={cls}>
                <button onClick={this.toggle} className="expandablepanel__button">
                    <span className="expandablepanel__title">{title}</span>
                    <i className="expandablepanel__indicator" />
                </button>
                <Collapse isOpened={this.state.isOpen} className="expandablepanel__content">
                    {children}
                </Collapse>
            </div>
        );
    }
}

Expandablepanel.propTypes = {
    className: PT.string,
    isOpen: PT.bool,
    children: PT.oneOfType([PT.node, PT.arrayOf(PT.node)]).isRequired
};

Expandablepanel.defaultProps = {
    isOpen: false,
    className: ''
};

export default Expandablepanel;