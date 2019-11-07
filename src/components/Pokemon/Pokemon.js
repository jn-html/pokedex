import React, { Component } from 'react';
import Axios from 'axios';
import './Pokemon.css';

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6',
};

export default class Pokemon extends Component {
    state = {
        name:'',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        statTitleWidth: 3,
        stateBarWidth: 9,
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialdefense: '',
        },
        height: '',
        weight: '',
        eggGroups:'',
        catchrate: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
        themeColor: '#ef5350',
    };
    async componentDidMount () {
        const { pokemonIndex } = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

        const pokemonRes = await Axios.get(pokemonUrl);
        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprite.font_default;

        let { hp, attack, defense, speed, specialAttack, specialdefense } = '';

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense': 
                    defense = ['base_stat'];
                case 'speed':
                    speed = ['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = ['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = ['base_stat'];
                    break;
                default: 
                    break;
            }
        });

    const  height = 
        Math.round((pokemonRes.data.height *0.328084 + 0.00001) * 100) / 100;

    const weight = 
    Math.round((pokemonRes.data.weight * 0.220462 + 0.00001)*100)/100;

    const type = pokemonRes.data.type.map(type => type.type.name);

    const themeColor = `${TYPE_COLOR[type[type.lenght -1]]}`;

    const abilities = pokemonRes.data.ailities.map(ability => {
        return ability.ability.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUppercase() + s.substring(1))
            .join(' ');
    })
    .join(', ');

    const evs = pokemonRes.data.stats
    .filter(stats => {
        if (stat.effort > 0) {
            return true;
        }
        return false;
    })
    .map(stat => {
        return `${stat.effort} ${stat.stat.name
        .toLowerCase()
        .split('-')
        .map( s => s.charAt(0).toUppercase() + s.substring(1))
        .join(' ')}`;
    })
    .join(', ');

    await Axios.get(pokemonSpeciesUrl).then(res=> {
        let description = '';
        res.data.flavor_text_entries.some(flavor => {
            if (flavor.language.name === 'en') {
                description = flavor.flavor._text;
                return;
            }
        });
        const femaleRate = res.data['gender_rate'];
        const genderRatioFemale = 12.5 * 8-femaleRate;
        const genderRatioMale = 12.5 * (8 - femaleRate);

        const catchRate = Math.round ((100 / 250) * res.data['capture_rate']);

        const eggGrounps = res.data['egg_groups']
        .map(groung => {
            return group.name
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUppercase() + s.substring(1))
            .join(' ');
            })
            .join(', ')

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGrounps,
                hatchSteps
            });
        });
            this.setState({
                imageUrl,
                pokemonIndex,
                name,
                type,
                stat: {
                    hp,
                    attack,
                    defense,
                    speed,
                    specialAttack,
                    specialDefense
                },
                themeColor,
                height,
                weight,
                abilities,
                evs
            });

    }

render(){
    return (
        <div className="col">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-5">
                            <h5>{this.state.pokemonIndex}</h5>
                        </div>
                        <div className="col-7">
                            <div className="float-right">
                                {this.state.types.map(type => (
                                    <span 
                                    key={type}
                                    className="badge badge-pill mr-1"
                                    style={{
                                        backgroundColor: `#${TYPE_COLORS[type]}`,
                                        color: "white"
                                    }}
                                    >
                                        {type
                                        .toLowerCase()
                                            .split(' ')
                                            .map(s => s.charAt(0).toUppercase() + s.substring(1))
                                            .join('')}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img src={this.state.imageUrl}
                            className="card-img-top rounded mx-auto mt-2"
                            alt="card-img-top"
                            />
                        </div>
                        <div className="col-md-9">
                            <h4 className="mx-auto">
                                {this.state.name
                                toLowerCase()
                                .split(' ')
                                .map(s => s.charAt(0).toUppercase()+s.substring(1))
                                .join(' ')}
                            </h4>
                            <div className="row align items-center">
                                <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                    HP
                                </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                    <div className="progress">
                                        <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style= {{
                                            width: `${this.state.stats.hp}%`,
                                            backgroundColor: `${this.state.themeColor}`
                                        }}
                                        aria-valuenow ="25"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        >
                                            <small>{this.state.stats.hp}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align items-center">
                                <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                    Attack
                                </div>
                                <div className={`col-12 col-md-${this.state.stateBarWidth}`}>
                                    <div className="progess-bar"
                                    role="progressbar"
                                    style={{
                                        width: `${this.state.attack}%`,
                                        backgroundColor: `#${this.state.themeColor}`
                                    }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    >
                                        <small>{this.state.stats.attack}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                Defense
                            </div>
                            <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                <div className="progess">
                                    <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width:`${this.state.stat.defense}%`,
                                        backgroundColor: `#${this.state.themeColor}`
                                    }}
                                    aria-valuenow ="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    >
                                        <small>{this.state.stats.defense}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-itel-center">
                            <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                Speed
                            </div>
                            <div className={`col-12 col-md-${this.state.stateBarWidth}`}>
                                <div className="progress">
                                    <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width: `${this.state.speed}%`,
                                        backgroundColor: `#${this.state.themeColor}`
                                    }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    >
                                        <small>{this.state.stats.speed}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ****************************
                    </div>
                </div>
            </div>
        </div>
    )
}

}