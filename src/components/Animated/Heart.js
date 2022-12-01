import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../Colors/Colors'

const colors = {
    transparent: 'transparent',
    white: '#fff',
    heartColor: '#e92f3c',
    textPrimary: '#515151',
    black: '#000',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    card: {
        height: 345,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 2
    },
    image: {
        marginTop: 10,
        height: 280,
        width: '92%'
    },
    photoDescriptionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 10
    },
    icon: {
        height: 50,
        width: 50,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 50,
        shadowColor: "#f56c62",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 12,
    },
    animatedIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        borderRadius: 160,
        opacity: 0,
    },
    text: {
        textAlign: 'center',
        fontSize: 13,
        backgroundColor: colors.transparent,
        color: colors.textPrimary
    },
    textPhotographer: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        textAlign: 'left',
        paddingTop: 0
    }
})

const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

class Heart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            liked: props.isLiked
        }

        this.lastPress = 0
    }

    handleLargeAnimatedIconRef = (ref) => {
        this.largeAnimatedIcon = ref
    }

    handleSmallAnimatedIconRef = (ref) => {
        this.smallAnimatedIcon = ref
    }

    animateIcon = () => {
        const { liked } = this.state
        this.largeAnimatedIcon.stopAnimation()

        if (liked) {
            this.largeAnimatedIcon.bounceIn()
                .then(() => this.largeAnimatedIcon.bounceOut())
            this.smallAnimatedIcon.pulse(200)
        } else {
            this.largeAnimatedIcon.bounceIn()
                .then(() => {
                    this.largeAnimatedIcon.bounceOut()
                    this.smallAnimatedIcon.bounceIn()
                })
                .then(() => {
                    if (!liked) {
                        this.setState(prevState => ({ liked: !prevState.liked }))
                    }
                })
        }
    }

    handleOnPress = () => {
        const time = new Date().getTime()
        const delta = time - this.lastPress
        const doublePressDelay = 400

        if (delta < doublePressDelay) {
            this.animateIcon()
        }
        this.lastPress = time
    }

    handleOnPressLike = () => {
        this.props.handler(this.props.data)
        this.smallAnimatedIcon.bounceIn()
        this.setState(prevState => ({ liked: !prevState.liked }))
    }

    render() {
        // const { liked } = this.state

        return (
            <TouchableOpacity
                style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                }}
                activeOpacity={1}
                onPress={this.handleOnPressLike}
            >
                <AnimatedIcon
                    ref={this.handleSmallAnimatedIconRef}
                    name={this.props.isLiked ? 'heart' : 'hearto'}
                    color={this.props.isLiked ? colors.heartColor : colors.textPrimary}
                    size={30}
                    style={styles.icon}
                />
            </TouchableOpacity>
        )
    }
}

export default Heart