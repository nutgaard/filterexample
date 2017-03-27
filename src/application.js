import React from 'react';
import Expandablepanel from "./components/expandablepanel/expandablepanel";
import Dropdown from "./components/dropdown/dropdown";
import Checkboxform from './components/checkboxform';
import Radioform from './components/radioform';
import Filterlist from './components/filterlist';


const choices = [
    'abba',
    'acdc',
    'four',
    'door',
    'down'
];

function Application() {
    return (
        <div className="application">
            <Expandablepanel title="Filter" className="blokk-s">
                <Dropdown title="Test 1" className="blokk-s">
                    <Checkboxform form="test1" choices={choices}/>
                </Dropdown>
                <Dropdown title="Test 2" className="blokk-s">
                    <Checkboxform form="test2" choices={choices}/>
                </Dropdown>
                <Dropdown title="Test 3" className="blokk-s">
                    <Radioform form="test3" choices={choices}/>
                </Dropdown>
            </Expandablepanel>
            <Filterlist />
        </div>
    );
}

Application.propTypes = {};

export default Application;
