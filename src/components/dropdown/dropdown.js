import React, { Component, Children, cloneElement, PropTypes as PT } from "react";
import "./dropdown.scss";

function isChildOf(parent, child) {
    if (child === document) return false;
    if (parent === child) return true;
    return isChildOf(parent, child.parentNode);
}

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: this.props.isOpen };

        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);

        this.handle = (e) => {
            if (this.state.isOpen && !isChildOf(this.wrapper, e.target)) {
                this.close();
            }
        };
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    close() {
        this.setState({ isOpen: false });
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handle);
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.handle);
    }

    render() {
        const { title, children, className } = this.props;
        const cls = ['dropdown', className, this.state.isOpen ? 'dropdown--open' : ''].join(' ');
        const childrenAugmented = !this.state.isOpen ? null : (
            <div className="dropdown__content">{Children.map(children, (child) => cloneElement(child, { closeDropdown: this.close }))}</div>
        );
        return (
            <div className={cls} ref={(wrapper) => this.wrapper = wrapper }>
                <button onClick={this.toggle} className="dropdown__button">
                    <span className="dropdown__title">{title}</span>
                    <i className="dropdown__indicator"/>
                </button>
                {childrenAugmented}
            </div>
        );
    }
}

Dropdown.propTypes = {
    className: PT.string,
    isOpen: PT.bool,
    children: PT.oneOfType([PT.node, PT.arrayOf(PT.node)]).isRequired
};

Dropdown.defaultProps = {
    isOpen: false,
    className: ''
};

export default Dropdown;