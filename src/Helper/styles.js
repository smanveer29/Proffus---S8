import { CL_ACCENT, CL_ERROR, CL_INFO, CL_PRIMARY, CL_SUCCESS, CL_WARNING } from "./Colors"

export const text={
   color: '#000',
   textTransform: 'capitalize'
}

export let borderRadius = (TL = 4, TR, BR, BL) => {
    if (!TR || !BR || !BL) TR = BR = BL = TL

    return {
        borderBottomRightRadius: BR,
        borderBottomLeftRadius: BL,
        borderTopRightRadius: TR,
        borderTopLeftRadius: TL,
    }
}
export let padding = (t, r, b, l) => {
    return {
        paddingTop: t,
        paddingRight: r,
        paddingBottom: b,
        paddingLeft: l,
    }
}
export let margin = (t, r, b, l) => {
    return {
        marginTop: t,
        marginRight: r,
        marginBottom: b,
        marginLeft: l,
    }
}

export const df = { display: 'flex' }
export const dfr = {
    ...df,
    flexDirection: 'row',
}
export const dfrc = {
    ...dfr,
    alignItems: 'center',
}
export const dfrcc = {
    ...dfr,
    alignItems: 'center',
    justifyContent: 'center',
}
export const dfrssb = {
    ...dfr,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
}
export const dfrcsb = {
    ...dfr,
    alignItems: 'center',
    justifyContent: 'space-between',
}
export const defaultHeader = {
    ...dfrcsb,
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'

}
export const dfrcsa = {
    ...dfr,
    alignItems: 'center',
    justifyContent: 'space-around',
}
export const dfrss = {
    ...dfr,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

}
export const dfccc = {
    ...df,
    alignItems: 'center',
    justifyContent: 'center',
}
export const dfcsb = {
    ...df,
    justifyContent: 'space-between',
}
export const dfccsb = {
    ...df,
    alignItems: 'center',
    justifyContent: 'space-between',
}
export const dfrccc = {
    ...dfr,
    alignItems: 'center',
    justifyContent: 'center',
}
export const dfcss = {
    ...df,
    alignItems: 'flex-start',
    // justifyContent: 'left',
}
export const h1 = {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    letterSpacing: .5,
    fontFamily: 'SignikaNegative-Medium',
}


export const imageDefault = {
    height: 30,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
}
export const logoSmall = {
    height: 30,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
}

export const logoMedium = {
    height: 50,
    width: 40,
    resizeMode: 'contain',
    marginRight: 10,
}
export const logoLarge = {
    height: 70,
    width: 60,
    resizeMode: 'contain',
    marginRight: 10,
}

export const btnDefault = {
    margin: 5,
}

export const btnSuccess = {
    ...btnDefault,
    backgroundColor: CL_SUCCESS,
}
export const btnError = {
    ...btnDefault,
    backgroundColor: CL_ERROR,
}
export const btnInfo = {
    ...btnDefault,
    backgroundColor: CL_INFO,
}

export const p = {
    fontSize: 14,
    fontFamily: 'SignikaNegative-Medium',
    color: '#2e2e2e',
}
export const p_warning = { ...p, color: CL_WARNING, }
export const p_primary = { ...p, color: CL_PRIMARY, }
export const p_success = { ...p, color: CL_SUCCESS, }
export const p_error = { ...p, color: CL_ERROR, }
export const p_info = { ...p, color: CL_INFO, }
export const p_waring = { ...p, color: CL_WARNING, }

export const h3 = {
    fontSize: 14,
    color: '#2e2e2e',
    fontFamily: 'SignikaNegative-Bold',
}
export const h3_accent = { ...h3, color: CL_ACCENT, }
export const h3_warning = { ...h3, color: CL_WARNING, }
export const h3_success = { ...h3, color: CL_SUCCESS, }
export const h3_error = { ...h3, color: CL_ERROR, }
export const h3_info = { ...h3, color: CL_INFO, }
export const h3_waring = { ...h3, color: CL_WARNING, }

export const h2 = {
    fontSize: 18,
    letterSpacing: .5,
    color: '#2e2e2e',
    fontFamily: 'SignikaNegative-Bold',
}
export const card = {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
}
export const h2_warning = { ...h2, color: CL_WARNING, }
export const h2_success = { ...h2, color: CL_SUCCESS, }
export const h2_error = { ...h2, color: CL_ERROR, }
export const h2_info = { ...h2, color: CL_INFO, }
export const h2_waring = { ...h2, color: CL_WARNING, }
export const HOME_MARGIN_TOP = 20