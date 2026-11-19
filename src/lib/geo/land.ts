/**
 * A 1° land mask of the world (360 × 180 cells, north to south, west to east),
 * sampled from Natural Earth's 1:50m land polygons (public domain, via world-atlas).
 *
 * Each row is run-length encoded: alternating water / land run lengths, starting
 * with water, one character per run from ALPHABET. Runs longer than 63 are split
 * by a zero-length run of the other kind. Rows are separated by ".".
 */
const ALPHABET =
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

const LAND =
	"_0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0_0h8_0_0_0k._0zkf21m_0_0_0d._0rn114E1125_061_0X._0l79b2O_11292v5_0k._0ln8Ku2111316_047_0h._0444523242b4Pw31412_0f5_0c._133419321222213813Jz43111_0g3_0b.X21171422325111117aL_0o4xb_04._01a662516mD_0e5ron51211x.W172e191vB_0c3so11_04.U98234253227lv13_0c3i24q33154311c3B.T619133611441433ku12_0c2e421113Mc5y.02S3321b51323g11h11q13_0d3c412261J31241bt.k821B9743le21m1131K215A6191_0dk.ho611511124e511113624119e21rF11ds4451_0v372.02cQ11447123122487epH11l62711418181_0D.05bT1c17164238alNp313o2_0H.09614_0a229c8jMk263q2_0J.01344_0g1111b722adg118qa3a5_0_0e.62b_0a244238ebi8pa3b2_0_0e3.829_0752d213eal2q2192_0_0v1.f_0992418221e8Mc3_0_0g2c111.e_09g6n7Lc5_0_0932297.fd132Ph8o2G16d44111_0_76129.i8eJh851_06517721_0W111353h.n311fIfa14W29326511_0Si3i.n113gHgfT5e511311_0Rh6h.k2o11IbfV2b3244_0Si7h.K11K9hT3a4117_0Qk6i.f1yM2mO313a131231_0Sj5j.L12M3nK433711_0_06f4k.M13K3nK4263_0_0a11d2m.Q_0811P53_0_0b11d2m.Q12_0231P16_0_0c22A.R21V324211Q11_0_0e22A.UT1465M_0_0j21B.U11V9111P_0_0f31B.UX1121Wx142b4_0m51A.U_Ye1g323a5_0lH.UU22_d3e993_0n61B.US-339343cb83_0l64z.UR-c61134ae65_0fb1B.UR-bb33944585_0dO.UO_02a7253155l3_0517b2C.UO_029215261334m4_032223c2C.VMK1j9g1432n5_0173c2C.WK_048e2714m5_021252a2D.WK_0716ai2122_0m6275D.XJ_0714cp_0l6356E.XI_07hq_0l614312H.-D_08jo_0n5134K._A_09o53c_0na1M._21x_08q477_0o91N._0112w_08t1_0CX._0221h4172_08G1f3_08W._0311fe2_07X3_08W._0231ee3_04L2d4_05X._0422cf2_03M2e7_Y._0512cg1_02O2d971RY._0513a_0kO2e42aP31W._07129_0jQ3k9N31X._0b8e114-Q3laI61X._0c79192YS2kb21e5g21_06._0b973a2XR3jee6e31_06.o1O954e3SR4hfc9c32_06._0d92113e6QS3ggbac31_07._0gd_09T3diaccd2W._0ib_09T4ak9c22ac2W._0o9_04V39m6ibb1X._0p9_03W26p6ibb2W._0s5_04X14s5i218b112U._0u3_04Ya1l5j127f1T._0v2b121SW71p4j136d112S._0v3741521MX16p4i153c1Y._0x221341aL_02p311h161c161S._0x42iL_r121h2n3S._0A12jL-u2h1o3R._0EjLe1Jv2i2e262S._0EoHa5IK143c4Z._0EpI1d12DM232b5Z._0EqZBO222a4_._0DrZAQ22277a1P._0CtYyT31159a1P._0BtYyU4693341P._0BwVxW31149912111L._0As1313SxX367235142K._0Av14TvY63723e5D._0AGOt-491311141312bA._0AHOr_013u9z._0AKLr_022d1e1382112s._0BJLr_043p14971o._0BJMq_056i169x._0CIMq_0d61221d332w._0DGNr_0g141m211t._0DGOq_0L1t._0EEPq_0r11191a1q._0EDPs81_0i651B.71_0xBQs72_0h662A._0FBPt72_0d22663z._0GAPt54_0bc54z._0IyPs46_0af1114m1b1.u1_0fwPq65_0ai15y._0LuQp75_0aoy._0LuRm95_09rw._0LuRm9581Yvf1f._0LtTl85_04yg1e._0LsUm75_03Au._0LpXl94_03Bt._0Ko-k93_03Ds._0Km_01ic1_05Dr._0Km_01i_0hEr._0Kn_i_0iEq._0Km_02g_0kDq._0Kl_04e_0lCr._0Jm_04e_0lCr._0Jk_07c_0nBr._0Kj_07b_0oa8is._0Jd15_089_0q8b21dt._0Je13_0a1_0x3g11et._0Ig_0_0_06cn16._0Ig_0_0_08ao15._0Hh_0_0_08ap14._0Hg_0_0_0c112s32._0Ib_0_0_0L33._0Hc_0_0_0M23._0H9_0_0_0l3o2114._0I9_0_0_0k3n36._0I8_0_0_0m1n37._0I8_0_0_0I39._0G8_0_0_0J49._0G8_0_0_0K2a._0H8_0_0_0V._0F117_0_0_0W._0G7_0_0b1_0L._0G6_0_0_0Y._0H592_0_0_0N._0H5_0_0_0Y._0H11121_0_0_0X._0J114t1_0_0_0r._0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0_0_0_0_0J._0X1_0_0_0M._0R121_0_0_0P._0R2_0_0A1_0g._0P2_0P7H744a238o1h._0M3_0N12cmZA._0O211_0Ft9_09t._0I316_0x25t7_0lk._0K216_06327217E4_0p11h._0I515O3171_053_0B9._0i3n426N_0g2_0Bb.R1qf4211211cJ_0_0Vd.M1318612aDH_0_0T11f.D_0eH11_0_0Ti.x_0eF_0_0_03h.m73_0bE_0_0_0923b.o_092591h68_0_0_0ed.h48_0c42k7d_0_0_01k.u_0ba667e_0_0_05j.h26_0rn_0_0_0ej.r_0r7_0_0_0wf.b7111_0_0_0_0_0f9.079_0_0_0_0_0t.0_0_0_0_0_0J.0_0_0_0_0_0J.0_0_0_0_0_0J.0_0_0_0_0_0J.0_0_0_0_0_0J";

export const MASK_WIDTH = 360;
export const MASK_HEIGHT = 180;

let decoded: Uint8Array | null = null;

/** The land mask as one byte per cell (1 = land), row-major from 90°N, 180°W. */
export function landMask(): Uint8Array {
	if (decoded) return decoded;
	const mask = new Uint8Array(MASK_WIDTH * MASK_HEIGHT);
	LAND.split(".").forEach((row, r) => {
		let c = 0;
		let land = false;
		for (const ch of row) {
			const len = ALPHABET.indexOf(ch);
			if (land) mask.fill(1, r * MASK_WIDTH + c, r * MASK_WIDTH + c + len);
			c += len;
			land = !land;
		}
	});
	decoded = mask;
	return mask;
}

/** Whether the point is on land, to the nearest degree. */
export function isLand(lat: number, lon: number): boolean {
	const r = Math.min(MASK_HEIGHT - 1, Math.max(0, Math.floor(90 - lat)));
	const c = ((Math.floor(lon + 180) % MASK_WIDTH) + MASK_WIDTH) % MASK_WIDTH;
	return landMask()[r * MASK_WIDTH + c] === 1;
}
